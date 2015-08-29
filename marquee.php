            <!-- MARQUEE -->
    		<div id="marquee">
				<div class="marquee-slideshow">
                    <?php 
                        $loop = new WP_Query( array( 'post_type' => 'project', 'posts_per_page' => -1 ) ); 
                        while ( $loop->have_posts() ) : $loop->the_post(); 
							if ( get_post_meta($post->ID, 'marquee_include', true) ) { ?>
	                            <div class="marquee-item" title='<?php echo get_post_meta($post->ID, 'marquee_word', true); ?>' style='background-image:url(<?php echo wp_get_attachment_url( get_post_meta($post->ID, 'project_background', true) ); ?>);' copy="<?php echo get_post_meta($post->ID, 'marquee_description', true); ?>" t="project<?php echo $post->ID ?>"></div>
					<?php   } 
                                
                       endwhile; wp_reset_query();?>

                    <div class="marquee-gradient"></div>
				</div>
				
				<div class="voyage-headline-wrapper">
					<h1 class="voyage-headline">
						<span class="voyage-type">&nbsp;</span><span class="voyage-voyage">VOYAGE</span>
					</h1>
					
					<p class="voyage-copy"></p>					
				</div>
				
				<a href="javascript:void(0);" class="view-project-btn" t="project<?php echo $post->ID ?>">
					VIEW PROJECT
					<span class="view-project-over">VIEW PROJECT</span>
				</a>
			</div>  