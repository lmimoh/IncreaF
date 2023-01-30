package com.main19.server.posting.like.entity;

import javax.persistence.*;

import com.main19.server.member.entity.Member;

import com.main19.server.posting.entity.Posting;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PostingLike {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long postingLikeId;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	@JoinColumn(name = "POSTING_ID")
	private Posting posting;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	@JoinColumn(name = "member_id")
	private Member member;


	public void setPosting(Posting posting) {
		this.posting = posting;
		if (!this.posting.getPostingLikes().contains(this)) {
			this.posting.getPostingLikes().add(this);
		}
	}

	public long getMemberId() {
		return member.getMemberId();
	}
}
