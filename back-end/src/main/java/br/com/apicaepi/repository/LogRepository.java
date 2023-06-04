package br.com.apicaepi.repository;

import br.com.apicaepi.model.Log;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LogRepository extends MongoRepository<Log, String> {
	
	Page<Log> findByIdUser(String id, Pageable pageable);

}
