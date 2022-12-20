package br.com.validatecaepi.controller.exception;

import br.com.validatecaepi.service.exception.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;


@ControllerAdvice
public class ResourceExceptionHandler {
	
	@ExceptionHandler(ObjectNotFoundException.class)
	public ResponseEntity<StandardError> objectNotFound(ObjectNotFoundException e, HttpServletRequest request){
		
		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.NOT_FOUND.value(), "Not found", e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
	}
	
	@ExceptionHandler(TooManyRequestsException.class)
	public ResponseEntity<StandardError> objectNotFound(TooManyRequestsException e, HttpServletRequest request){
		
		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.TOO_MANY_REQUESTS.value(), "Too Many Requests", e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(err);
	}
	
	@ExceptionHandler(DataIntegrityException.class)
	public ResponseEntity<StandardError> objectNotFound(DataIntegrityException e, HttpServletRequest request){
		
		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.BAD_REQUEST.value(), "Data integrity", e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}

	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<StandardError> objectNotFound(MethodArgumentTypeMismatchException e, HttpServletRequest request){

		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.BAD_REQUEST.value(), "Data integrity", e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ValidationError> objectNotFound(MethodArgumentNotValidException e, HttpServletRequest request){

		ValidationError err = new ValidationError(System.currentTimeMillis(),
				HttpStatus.UNPROCESSABLE_ENTITY.value(), "Unprocessable Entity", "", request.getRequestURI());

		String mergedMessages = "";
		for(FieldError x : e.getBindingResult().getFieldErrors()) {
			String attribute = x.getField();
			String msg = String.format("Attribute '%s' %s", attribute, x.getDefaultMessage());
			err.addError(attribute, msg);

			if(!mergedMessages.contains(String.format("'%s'", attribute))){
				mergedMessages += mergedMessages.length() > 0 ? " | " : "";
				mergedMessages += String.format("Attribute '%s' is invalid", attribute);
			}
		}

		err.setMessage(mergedMessages);
		return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(err);
	}
	                  
	@ExceptionHandler(AuthorizationException.class)
	public ResponseEntity<StandardError> objectNotFound(AuthorizationException e,
														HttpServletRequest request){
		
		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.FORBIDDEN.value(), "FORBIDDEN", e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err);
	}
	
	
	@ExceptionHandler(FileException.class)
	public ResponseEntity<StandardError> objectNotFound(FileException e, HttpServletRequest request){
		
		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.BAD_REQUEST.value(), "File error", e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}

	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<StandardError> objectNotFound(NullPointerException e, HttpServletRequest request){

		StandardError err = new StandardError(System.currentTimeMillis(),
				HttpStatus.BAD_REQUEST.value(), "NullPointerException", e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}
	
}
