package br.com.validatecaepi.config;

import br.com.validatecaepi.model.Caepi;
import br.com.validatecaepi.repository.CaepiRepository;
import br.com.validatecaepi.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;

@Configuration
@Profile("dev")
public class DevConfig {

	private final CaepiRepository repoCaepi;
	private final BaseService baseCaepi;

	@Autowired
	public DevConfig(CaepiRepository repoCaepi, BaseService baseCaepi) {
		this.repoCaepi = repoCaepi;
		this.baseCaepi = baseCaepi;
	}

	@Bean
	public boolean instantiateDataDase() {
		if(repoCaepi.count() == 0){
			System.out.println("Please wait, creating database...");
			List<Caepi> caepiList = baseCaepi.getBaseCaepi("classpath:tgg_export_caepi.txt");
			repoCaepi.saveAll(caepiList);
			System.out.println("Database created with " + caepiList.size() + " CAEPI.");
		}
		return true;
	}
	
}
