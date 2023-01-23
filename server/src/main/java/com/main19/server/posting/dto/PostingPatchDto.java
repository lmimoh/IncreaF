package com.main19.server.posting.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.*;

@Getter
@AllArgsConstructor
public class PostingPatchDto {
	@Positive
	private long postingId;
	private String postingContent;
	@Size(max = 5)
	private List<@NotBlank @Length(min = 1, max = 15) String> tagName;
	public void setPostingId(long postingId) {
		this.postingId = postingId;
	}
}