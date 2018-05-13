<?php

namespace App\Service;


use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;

class FaceRecognition
{
    /** @var Client */
    private $client;

    /**
     * FaceRecognitionService constructor.
     *
     * @param Client $client
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * @param UploadedFile $image
     *
     * @return array
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function calculateFaceEncoding(UploadedFile $image): array
    {
        $request = $this->client->request('POST', '/encoding', [
            'file' => base64_encode($image),
        ]);

        return $request->getStatusCode() === Response::HTTP_OK
            ? json_decode($request->getBody())
            : null;
    }

    /**
     * @param float[]      $encodings
     * @param UploadedFile $image
     *
     * @return bool[]
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function compareFacesWithEncodings(array $encodings, UploadedFile $image): array
    {
        $response = $this->client->request('POST', '/recognition', [
            'multipart' => [
                [
                    'name'     => 'encodings',
                    'contents' => json_encode($encodings),
                ],
                [
                    'name'     => 'file',
                    'contents' => base64_encode($image),
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