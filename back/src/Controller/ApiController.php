<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\IucnApi;

/**
* @Route("/api/v1", name="iucn-")
*/
class ApiController extends AbstractController
{
    private $IucnApi;

    public function __construct(IucnApi $iucnApi)
    {
        $this->IucnApi = $iucnApi;
    }

    /**
     * @Route("/list", name="list")
     *
     * @return Response
     */
    public function list(): Response
    {
       
        try {
            $list = $this->IucnApi->fetchAllFrenchSpecies();
            return $this->json($list, 200);
        } catch (\Exception $e) {
            $error = ["error"=>"L'API ne répond pas"];
            return $this->json($error, 500);
        }
    }

    /**
     * @Route("/{name}/common", name="common_name")
     *
     * @return Response
     */
    public function commonName(string $name): Response
    {
        
        try {
            $translation = $this->IucnApi->fetchCommonName($name);
            return $this->json($translation, 200);
        } catch (\Exception $e) {
            $error = ["error"=>"L'API ne répond pas"];
            return $this->json($error, 500);
        }
    }

        /**
     * @Route("/{name}/threat", name="threat")
     *
     * @return Response
     */
    public function threat(string $name): Response
    {
        
        try {
            $threats = $this->IucnApi->fetchThreats($name);
            return $this->json($threats, 200);
        } catch (\Exception $e) {
            $error = ["error"=>"L'API ne répond pas"];
            return $this->json($error, 500);
        }
    }
}