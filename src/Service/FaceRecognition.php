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
                    'name'     => 'image',
                    'contents' => base64_encode(file_get_contents($this->directory . '/' . $image)),
                ],
            ],
        ]);

        return json_decode($request->getBody()->getContents());
    }

    /**
     * @param array $encodings
     * @param string $image
     *
     * @throws \GuzzleHttp\Exception\ClientException
     * @return mixed
     */
    public function recognizeFaces(array $encodings, string $image)
    {
        $response = $this->client->post('http://python:5000/recognition', [
            'multipart' => [
                [
                    'name'     => 'encodings',
                    'contents' => json_encode($encodings),
                ],
                [
                    'name'     => 'image',
                    'contents' => base64_encode(file_get_contents($image)),
                ],
            ],
        ]);
        
        return json_decode($response->getBody(), true);
    }
}
