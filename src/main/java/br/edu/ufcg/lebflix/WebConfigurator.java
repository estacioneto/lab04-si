package br.edu.ufcg.lebflix;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ResourceProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

/**
 * Resources manager class. It manages the application front-end files.
 *
 * @author Estácio Pereira.
 */
@Configuration
public class WebConfigurator extends WebMvcConfigurerAdapter {

    @Autowired
    private ResourceProperties resourceProperties = new ResourceProperties();

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Integer cache = resourceProperties.getCachePeriod();

        registry.addResourceHandler("/js/**")
                .addResourceLocations("/js/")
                .setCachePeriod(cache);

        registry.addResourceHandler("/css/**")
                .addResourceLocations("/css/")
                .setCachePeriod(cache);

        registry.addResourceHandler("/img/**")
                .addResourceLocations("/img/")
                .setCachePeriod(cache);

        registry.addResourceHandler("/view/**")
                .addResourceLocations("/view/")
                .setCachePeriod(cache);

        registry.addResourceHandler("/vendor/**")
                .addResourceLocations("/vendor/")
                .setCachePeriod(cache);

        registry.addResourceHandler("/fonts/**")
                .addResourceLocations("/fonts/")
                .setCachePeriod(cache);

        registry.addResourceHandler("/**")
                .addResourceLocations("/index.html")
                .setCachePeriod(cache)
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        return location.exists() && location.isReadable() ? location : null;
                    }
                });
    }
}

