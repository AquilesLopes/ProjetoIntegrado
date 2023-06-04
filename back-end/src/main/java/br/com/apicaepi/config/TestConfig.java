package br.com.apicaepi.config;

import br.com.apicaepi.model.Caepi;
import br.com.apicaepi.repository.CaepiRepository;
import br.com.apicaepi.service.BaseCaepiSerializableService;
import br.com.apicaepi.service.BaseFileService;
import br.com.apicaepi.service.InfoDataBaseService;
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

	private final InfoDataBaseService infoDataBaseService;

	private final BaseCaepiSerializableService baseCaepiSerializable;

	@Autowired
	public TestConfig(CaepiRepository repoCaepi,
					  BaseFileService baseCaepi,
					  InfoDataBaseService infoDataBaseService,
					  BaseCaepiSerializableService baseCaepiSerializable) {
		this.repoCaepi = repoCaepi;
		this.baseCaepi = baseCaepi;
		this.infoDataBaseService = infoDataBaseService;
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

				System.out.println("Generating database detail...");
				infoDataBaseService.generateInfo(caepiList);
				System.out.println("Database configured successfully.");
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

				System.out.println("Generating database detail...");
				infoDataBaseService.generateInfo(caepiList);
				System.out.println("Database configured successfully.");
			}else{
				System.out.println("Error reading serializable database file");
			}
		}

		return true;
	}


}
