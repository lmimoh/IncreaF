package com.main19.server.advice;

import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.main19.server.exception.BusinessLogicException;
import com.main19.server.response.ErrorResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {
	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		final ErrorResponse response = ErrorResponse.of(e.getBindingResult());

		return response;
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse handleConstraintViolationException(ConstraintViolationException e) {
		final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());

		return response;
	}

	@ExceptionHandler
	public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {
		final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

		return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode()
			.getStatus()));
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	public ErrorResponse handleHttpRequestMethodNotSupportedException(
		HttpRequestMethodNotSupportedException e) {

		final ErrorResponse response = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);

		return response;
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse handleHttpMessageNotReadableException(
		HttpMessageNotReadableException e) {

		final ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST,
			"Required request body is missing");

		return response;
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse handleMissingServletRequestParameterException(
		MissingServletRequestParameterException e) {

		final ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST,
			e.getMessage());

		return response;
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorResponse MissingRequestHeaderException(
		MissingRequestHeaderException e) {

		final ErrorResponse response = ErrorResponse.of(HttpStatus.UNAUTHORIZED,e.getMessage());

		return response;
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ErrorResponse handleException(Exception e) {
		log.error("# handle Exception", e);

		final ErrorResponse response = ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);

		return response;
	}
}
