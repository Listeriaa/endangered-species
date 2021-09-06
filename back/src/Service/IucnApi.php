<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;


class IucnApi
{
    private $apiUrl = 'https://apiv3.iucnredlist.org/api/v3/';
    private $client;
    private $token;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
        $this->token = $_ENV["TOKEN"];

    }
    /**
     * Method allowing to fetch informations from IUCN API ab
     *
     * @param string manga title
     * @return Array
     */
    public function fetchAllFrenchSpecies(): array
    {
        $response = $this->client->request(
            'GET',   
            $this->apiUrl . 'country/getspecies/FR?token=' . $this->token
        );

        return $response->toArray();
    }

    public function fetchCommonName(string $name): array
    {

        $response = $this->client->request(
            'GET',   
            $this->apiUrl . 'species/common_names/' . $name . "?token=" . $this->token
        );

        return $response->toArray();

    }

    public function fetchThreats(string $name): array
    {
        
        $response = $this->client->request(
            'GET',   
            $this->apiUrl . 'threats/species/name/' . $name . "?token=" . $this->token
        );

        return $response->toArray();

    }
}