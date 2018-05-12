<?php

namespace App\Service;


use GuzzleHttp\ClientInterface;
use Symfony\Component\HttpFoundation\Response;

class FaceRecognition
{
    /** @var ClientInterface */
    private $client;
    
    /** @var string */
    private $directory;

    /**
     * FaceRecognitionService constructor.
     *
     * @param ClientInterface $client
     * @param string          $directory
     */
    public function __construct(ClientInterface $client, string $directory)
    {
        $this->client = $client;
        $this->directory = $directory;
    }

    /**
     * @param string $imageFileName
     *
     * @return array
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function calculateFaceEncoding(string $imageFileName): array
    {
        $request = $this->client->request('POST', '/encoding', [
            'body' => [
                'file' => fopen($this->directory.'/'.$imageFileName, 'r'),
            ],
        ]);

        return $request->getStatusCode() === Response::HTTP_OK
            ? json_decode($request->getBody())
            : null;
    }

    /**
     * @param string  $imageFileName
     * @param float[] $encodings
     *
     * @return bool[]
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function compareFacesWithEncodings(array $encodings, string $imageFileName): array
    {
        $request = $this->client->request('GET', '/recognition', [
            'body' => [
                'encodings' => $encodings,
                'file'      => fopen($this->directory.'/'.$imageFileName, 'r'),
            ],
        ]);

        return $request->getStatusCode() === Response::HTTP_OK
            ? json_decode($request->getBody())
            : null;
    }
}