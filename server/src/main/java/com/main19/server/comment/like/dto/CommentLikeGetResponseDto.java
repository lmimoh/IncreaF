package com.main19.server.comment.like.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentLikeGetResponseDto {

    private long memberId;
    private String userName;

}
