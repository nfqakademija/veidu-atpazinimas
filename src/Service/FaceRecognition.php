<?php

namespace App\Service;


use App\Entity\Attendance;
use App\Entity\Student;
use Doctrine\Common\Collections\ArrayCollection;
use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\Response;

class FaceRecognition
{
    /** @var Client */
    private $client;

    private $directory;

    /**
     * FaceRecognitionService constructor.
     *
     * @param Client $client
     * @param string $directory
     */
    public function __construct(Client $client, string $directory)
    {
        $this->client = $client;
        $this->directory = $directory;
    }

    /**
     * @param string $image
     *
     * @return array
     */
    public function calculateFaceEncoding(string $image): array
    {
        $request = $this->client->post('http://python:5000/encoding', [
            'multipart' => [
                [
                    'name'    => 'file',
                    'contents' => base64_encode(file_get_contents($this->directory.'/'.$image)),
                ],
            ],
        ]);

        return $request->getStatusCode() === Response::HTTP_OK
            ? json_decode($request->getBody()->getContents())
            : [];
    }

    /**
     * @param float[] $students
     * @param string  $image
     *
     * @return ArrayCollection|Attendance
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function checkAttendances(array $students, string $image)
    {
        $withEncodings = array_filter($students, function (Student $student) {
            return $student->hasEncoding();
        });

        $encodings = array_map(function (Student $student) {
            return $student->getEncoding();
        }, array_values($withEncodings));
        
        $response = $this->client->request('POST', 'http://python:5000/recognition', [
            'multipart' => [
                [
                    'name'     => 'encodings',
                    'contents' => json_encode($encodings),
                ],
                [
                    'name'     => 'file',
                    'contents' => base64_encode(file_get_contents($image)),
                ],
            ],
        ]);

        $mask = json_decode($response->getBody());

        $withEncodings = array_combine(array_keys($withEncodings), $mask);

        return $this->generateAttendances($students, $withEncodings);
    }


    /**
     * @param array|Student $students
     * @param array|bool    $compared
     *
     * @return ArrayCollection|Attendance
     */
    private function generateAttendances($students, $compared)
    {
        $attendances = new ArrayCollection();
        foreach ($compared as $index => $hasAttended) {
            $attendance = (new Attendance())
                ->setStudent($students[$index])
                ->setAttended($hasAttended);

            $attendances->add($attendance);
        }

        return $attendances;
    }
}