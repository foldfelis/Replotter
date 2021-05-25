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

    return HTTP.Response(200, headers; body = JSON.json(rand(2)))
end

HTTP.@register(ROUTER, "GET", "/api/surface", surface)

function Base.run()
    @info "service started at http://127.0.0.1:8080/api/surface"
    HTTP.serve(SERVER, Sockets.localhost, 8080)
end
