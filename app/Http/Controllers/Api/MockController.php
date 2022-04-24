<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mock;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class MockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mocks = Mock::all();
        return response($mocks);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $mock = new Mock();
        $mock->create($request->all());
        return response($mock, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Mock  $mock
     * @return \Illuminate\Http\Response
     */
    public function show(Mock $mock)
    {
        return response($mock);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Mock  $mock
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Mock $mock)
    {
        $mock->update($request->all());
        return response($mock);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Mock  $mock
     * @return \Illuminate\Http\Response
     */
    public function destroy(Mock $mock)
    {
        $mock->delete();
        return response($mock);
    }

    public function getAllMocksByProductSlug($projectSlug)
    {
        $mocks = Mock::whereHas('project', function (Builder $query) use ($projectSlug) {
            $query->where('slug', $projectSlug);
        })->get();
        return response($mocks);
    }

    public function mock(Request $request)
    {
        $endpointName = substr(request()->getPathInfo(), 5);
        $params = $request->query();
        $paramStr = '';
        if ($params) {
            foreach ($params as $param => $value) {
                $paramStr .= "$param=$value&";
            }
        }

        if ($paramStr) {
            $paramStr = rtrim($paramStr, "&");
            $endpointName .= "?$paramStr";
        }

        $method = request()->method();

        $mock = Mock::where('endpoint', $endpointName)->first();
        if (!$mock) {
            return response([], 404);
        }

        if (strtoupper($mock->method) != strtoupper($method)) {
            return response([], 405);
        }

        return response()->json(json_decode($mock->response));
    }
}
