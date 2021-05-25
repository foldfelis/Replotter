using Plots

function f(x::Real, σ::Real, μ::Real)
    return exp(-0.5((x-μ)/σ)^2) / (σ * sqrt(2π))
end

f(σ::Real, μ::Real) = x -> f(x, σ, μ)

surface(range::AbstractRange; σ=1, μ=0) = f(σ, μ).(range) * f(σ, μ).(range)'

function plot_surface(range::AbstractRange; σ=1, μ=0)
    𝐬 = surface(range, σ=σ, μ=μ)

    lim = maximum(abs.(𝐬))

    return Plots.surface(
        range, range, 𝐬,
        color=:coolwarm,
        zlim=(-lim, lim)
    )
end
