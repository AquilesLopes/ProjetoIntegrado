package br.com.validatecaepi.config;

import br.com.validatecaepi.model.Caepi;
import br.com.validatecaepi.repository.CaepiRepository;
import br.com.validatecaepi.service.BaseCaepiSerializableService;
import br.com.validatecaepi.service.BaseFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;

@Configuration
@Profile("test")
public class TestConfig {

	private final CaepiRepository repoCaepi;
	private final BaseFileService baseCaepi;

	private final BaseCaepiSerializableService baseCaepiSerializable;

	@Autowired
	public TestConfig(CaepiRepository repoCaepi,
					  BaseFileService baseCaepi,
					  BaseCaepiSerializableService baseCaepiSerializable) {
		this.repoCaepi = repoCaepi;
		this.baseCaepi = baseCaepi;
		this.baseCaepiSerializable = baseCaepiSerializable;
	}

	@Bean
	public boolean instantiateDataDase() {
		boolean baseOkay = false;

		System.out.println("Validating database...");

		if(repoCaepi.count() == 0){
			System.out.println("Empty database...");
			System.out.println("Please wait, creating database...");
			System.out.println("Identifying serializable database...");
			String fileName = "data_base_caepi.serializable";
			List<Caepi> caepiList = baseCaepiSerializable.readFileListCaepi(fileName);

			if(caepiList != null && caepiList.size() > 0){
				System.out.println("Synchronizing database...");
				repoCaepi.saveAll(caepiList);
				System.out.println("Database created with " + caepiList.size() + " CAEPI.");
				baseOkay = true;
			}else{
				System.out.println("Error reading serializable database file");
			}
		}else {
			System.out.println("Valid database with " + repoCaepi.count() + " CAEPI.");
			baseOkay = true;
		}

		if(!baseOkay){
			System.out.println("Empty database...");
			System.out.println("Please wait, creating database...");
			System.out.println("Identifying txt database...");
			List<Caepi> caepiList = baseCaepi.getBaseCaepi("templates/tgg_export_caepi.txt");

			if(caepiList != null && caepiList.size() > 0){
				System.out.println("Synchronizing database...");
				repoCaepi.saveAll(caepiList);
				System.out.println("Database created with " + caepiList.size() + " CAEPI.");
				baseOkay = true;
			}else{
				System.out.println("Error reading serializable database file");
			}
		}

		return true;
	}


}
