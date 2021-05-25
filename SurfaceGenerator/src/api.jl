using HTTP
using JSON

const ROUTER = HTTP.Router()

function surface(req::HTTP.Request)
    headers = [
        "Access-Control-Allow-Origin" => "*",
        "Access-Control-Allow-Methods" => "GET, OPTIONS"
    ]
    if HTTP.method(req) == "OPTIONS"
        return HTTP.Response(200, headers)
    end

    uri = HTTP.URIs.splitpath(req.target)
    if length(uri) != 5
        return HTTP.Response(400, headers)
    end

    (offset, step, stop) = parse.(Float64, uri[3:5])
    r = offset:step:stop

    return HTTP.Response(200, headers; body=JSON.json(surface(r, σ=1, μ=0)))
end

HTTP.@register(ROUTER, "GET", "/api/surface", surface)

function Base.run()
    @info "service started at http://127.0.0.1:8080/api/surface/-10/0.1/10"
    HTTP.serve(ROUTER, "127.0.0.1", 8080)
end
