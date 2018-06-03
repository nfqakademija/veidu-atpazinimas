<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class LectureControllerTest extends WebTestCase
{
    public function testReact()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/attendance');

        $this->assertSame(200, $client->getResponse()->getStatusCode());
        $this->assertSame(1, $crawler->filter('#root')->count());
    }
}
