					<!-- FOOTER -->
			    	<div id="contact">
						<div class="contact-block">
							<div class="contact-container">
								<div class="contact-header">
									 <?php echo get_post_meta(10, 'section_title', true); ?>
								</div>
								<div class="contact-copy">
									<?php echo get_post_meta(10, 'section_desc', true); ?> 
								</div>
								<div class="contact-info">
									<div class="contact-details">
										<div class="contact-p">PHONE <div><?php echo get_post_meta(10, 'phone', true); ?></div></div>
										<div class="contact-e">EMAIL <a href="mailto:<?php echo get_post_meta(10, 'email', true); ?>"><?php echo get_post_meta(10, 'email', true); ?></a></div>
										<div class="contact-social">
											<a href="<?php echo get_post_meta(10, 'instagram', true); ?>" target="_blank" class="contact-fb"><span>Instagram</span></a>
											&nbsp; &nbsp; &nbsp;
											<a href="<?php echo get_post_meta(10, 'twitter', true); ?>" target="_blank" class="contact-tw"><span>&nbsp;&nbsp;Twitter</span></a>
										</div>
									</div>
									<div class="contact-form">
										<div class="send-success">
											<span>Thank you for your message.</span><br>We will be in touch shortly.
										</div>
										<div class="contact-wrapper">
											<p class="errormessage">* Please enter a valid name</p>
											<form name="contactform" id="contactform">
												<input name="contactname" id="contactname" type="text" value="" tabindex="1" placeholder="Your Name">
												<input name="contactemail" id="contactemail" type="text" value="" tabindex="2" placeholder="Your Email">
												<textarea name="contactmessage" id="contactmessage" tabindex="3" rows="7" cols="50" placeholder="Your Message"></textarea>
											</form>
											<a href="javascript:void(0);" class="contact-submit">
												SUBMIT
												<span class="submit-over">SUBMIT</span>
											</a>
										</div>
									</div>
									<br class="clear" />
								</div>
							</div>
						</div>
						<div class="contact-copyright">
							<div class="copyright"><span>&copy; 2015 Voyage Creative. All rights reserved.</span></div> 
						</div>
					</div>
				</div>
		</div>
	</body>
</html>
