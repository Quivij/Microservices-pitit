package com.eazybuy.gatewayserver.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("product-service-products", r -> r
                        .path("/api/v1/products/**")
                        .uri("lb://product-service"))
                .route("product-service-categories", r -> r
                        .path("/api/v1/categories/**")
                        .uri("lb://product-service"))
                .route("identity-service-auth", r -> r
                        .path("/api/v1/auth/**")
                        .uri("lb://identity-service"))
                .route("identity-service-users", r -> r
                        .path("/api/v1/users/**")
                        .uri("lb://identity-service"))
                .route("identity-openapi", r -> r
                        .path("/v3/api-docs/identity")
                        .filters(f -> f.setPath("/v3/api-docs"))
                        .uri("lb://identity-service"))
                .route("identity-openapi-paths", r -> r
                        .path("/v3/api-docs/identity/**")
                        .filters(f -> f.rewritePath(
                                "/v3/api-docs/identity/(?<segment>.*)",
                                "/v3/api-docs/${segment}"))
                        .uri("lb://identity-service"))
                .route("product-openapi", r -> r
                        .path("/v3/api-docs/product")
                        .filters(f -> f.setPath("/v3/api-docs"))
                        .uri("lb://product-service"))
                .route("product-openapi-paths", r -> r
                        .path("/v3/api-docs/product/**")
                        .filters(f -> f.rewritePath(
                                "/v3/api-docs/product/(?<segment>.*)",
                                "/v3/api-docs/${segment}"))
                        .uri("lb://product-service"))
                .route("cart-service", r -> r
                        .path("/api/v1/cart/**")
                        .uri("lb://cart-service"))
                .route("order-service", r -> r
                        .path("/api/v1/orders/**")
                        .uri("lb://order-service"))
                .route("cart-openapi", r -> r
                        .path("/v3/api-docs/cart")
                        .filters(f -> f.setPath("/v3/api-docs"))
                        .uri("lb://cart-service"))
                .route("cart-openapi-paths", r -> r
                        .path("/v3/api-docs/cart/**")
                        .filters(f -> f.rewritePath("/v3/api-docs/cart/(?<segment>.*)", "/v3/api-docs/${segment}"))
                        .uri("lb://cart-service"))
                .route("order-openapi", r -> r
                        .path("/v3/api-docs/order")
                        .filters(f -> f.setPath("/v3/api-docs"))
                        .uri("lb://order-service"))
                .route("order-openapi-paths", r -> r
                        .path("/v3/api-docs/order/**")
                        .filters(f -> f.rewritePath("/v3/api-docs/order/(?<segment>.*)", "/v3/api-docs/${segment}"))
                        .uri("lb://order-service"))
                .route("payment-openapi", r -> r
                        .path("/v3/api-docs/payment")
                        .filters(f -> f.setPath("/v3/api-docs"))
                        .uri("lb://payment-service"))
                .route("payment-openapi-paths", r -> r
                        .path("/v3/api-docs/payment/**")
                        .filters(f -> f.rewritePath("/v3/api-docs/payment/(?<segment>.*)", "/v3/api-docs/${segment}"))
                        .uri("lb://payment-service"))
                .route("payment-service-api", r -> r
                        .path("/api/v1/payments/**")
                        .uri("lb://payment-service"))
                .route("media-service", r -> r
                        .path("/api/v1/media/**")
                        .uri("lb://media-service"))
                .route("swagger-ui", r -> r
                        .path("/swagger-ui", "/swagger-ui.html", "/swagger-ui/**", "/webjars/**")
                        .uri("lb://identity-service"))
                .build();
    }
}
