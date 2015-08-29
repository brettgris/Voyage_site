            <!-- ABOUT -->
    		<div id="about">
				<div class="about-wrapper">
    				<div class="about-header">
						<h3 class="about-headline"><?php echo get_post_meta(8, 'section_title', true); ?></h3>
						<div class="about-copy">
                            <?php echo get_post_meta(8, 'section_desc', true); ?>
                        </div>
                    </div>
                    <!-- SERVICES -->
                    <div class="about-header subsection">
						<ul class="services-list">
                        	<?php 
		                        $loop = new WP_Query( array( 'post_type' => 'services', 'posts_per_page' => -1 ) ); 
		                        while ( $loop->have_posts() ) : $loop->the_post(); ?>
			                            <li class="service-item">
			                            	<div class="service-icon" style="background-image: url(<?php echo wp_get_attachment_url( get_post_meta($post->ID, 'service_icon', true) ); ?>);"></div>
			                            	<div class="service-title"><?php the_title(); ?></div>
			                            	<div class="service-copy"><?php the_content(); ?></div>
			                            </li>
							<?php endwhile; wp_reset_query();?>
                        </ul>
                        <br class="clear" />
                    </div>
                </div>
			</div> 