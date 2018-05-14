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
     * @param float[] $encodings
     * @param string  $image
     *
     * @return bool[]
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function compareFacesWithEncodings(array $encodings, string $image): array
    {
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

        return $response->getStatusCode() === Response::HTTP_OK
            ? json_decode($response->getBody())
            : null;
    }
}