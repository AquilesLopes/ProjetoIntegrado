package br.com.validatecaepi.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(
                        new Info().title("Validation CAEPI API")
                        .description("Application for validation of Brazilian Personal Protection Certificates")
                        .version("v1.0")
                        .license(
                                new License().name("Apache License, Version 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")
                        )
                )
                .externalDocs(
                        new ExternalDocumentation()
                        .description("Validation CAEPI Documentation")
                        .url("https://validate-caepi.com.br")
                );

    }
}

