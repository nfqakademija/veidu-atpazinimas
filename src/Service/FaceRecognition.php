<?php

namespace App\Service;


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
     * @return string
     */
    public function calculateFaceEncoding(string $image): string
    {
        $request = $this->client->post('/encoding', [
            'multipart' => [
                [
                    'name'    => 'file',
                    'contents' => base64_encode(file_get_contents($this->directory.'/'.$image)),
                ],
            ],
        ]);

        return $request->getStatusCode() === Response::HTTP_OK
            ? json_decode($request->getBody())
            : "";
    }

    /**
     * @param float[] $encodings
     * @param string  $image
     *
     * @return bool[]
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function compareFacesWithEncodings(array $encodings, string $image): array
    {
        $response = $this->client->request('POST', '/recognition', [
            'multipart' => [
                [
                    'name'     => 'encodings',
                    'contents' => json_encode($encodings),
                ],
                [
                    'name'     => 'file',
                    'contents' => base64_encode(file_get_contents($this->directory.'/'.$image)),
                ],
            ],
        ]);

        echo 'Sending';

        echo highlight_string("<?php\n\$data=".$response.";\n", true);

        return $response->getStatusCode() === Response::HTTP_OK
            ? json_decode($response->getBody())
            : null;
    }
}