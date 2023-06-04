package br.com.apicaepi.config;

import br.com.apicaepi.model.Caepi;
import br.com.apicaepi.repository.CaepiRepository;
import br.com.apicaepi.service.BaseFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;

@Configuration
@Profile("dev")
public class DevConfig {

	private final CaepiRepository repoCaepi;
	private final BaseFileService baseCaepi;

	@Autowired
	public DevConfig(CaepiRepository repoCaepi, BaseFileService baseCaepi) {
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
