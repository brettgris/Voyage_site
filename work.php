            <!-- WORK -->
    		<div id="work" >
				<div class="work-wrapper">
					<div class="work-header">
						<h3 class="work-headline">
                            <?php echo get_post_meta(6, 'section_title', true); ?>
                        </h3>
						<div class="work-copy">
                            <?php echo get_post_meta(6, 'section_desc', true); ?>
                        </div>
						
						<div class="work-filter">
							<div class="work-filter-headline">FILTER</div>
							<div class="work-filter-types">
								<a href="javascript:void(0);">ART DIRECTION</a>
								<a href="javascript:void(0);">DEVELOPMENT</a>
								<a href="javascript:void(0);">DESIGN</a>
								<a href="javascript:void(0);">WEB</a>
                                <a href="javascript:void(0);">TABLET</a>
								<a href="javascript:void(0);">MOBILE</a>
								<a href="javascript:void(0);">FLASH</a>
								<a href="javascript:void(0);">GAME</a>
								<a href="javascript:void(0);">SOCIAL</a>
								<a href="javascript:void(0);">BANNERS</a>
							</div>
						</div>	
					</div>
				</div>
				<div class="project-list">
                    <?php 
                        $loop = new WP_Query( array( 'post_type' => 'project', 'posts_per_page' => -1 ) ); 
                        while ( $loop->have_posts() ) : $loop->the_post(); ?>
                            <!-- <?php the_title(); ?> -->
                            <div class="project-item" id="project<?php echo $post->ID ?>">
                                <div class="project-item-list" style="background-image:url(<?php echo wp_get_attachment_url( get_post_meta($post->ID, 'project_background', true) ); ?>);" 
                                    <?php
                                        $project_types = get_post_meta($post->ID, 'project_types', true);
                                        foreach ($project_types as $pt) {
                                            echo $pt."=true ";
                                        }
                                    ?>>
                                    <div class="project-overlay"></div>
            						<div class="project-details">
                                        <div class="details-<?php if (get_post_meta($post->ID, 'left_or_right', true)=="Left")echo "right";else echo "left"; ?>">
        									<div class="project-ta" style="background-image:url(<?php echo wp_get_attachment_url( get_post_meta($post->ID, 'project_logo', true) ); ?>);" /></div>
        									<h3 class="project-title"><?php the_title(); ?></h3>
        									<p class="project-copy"><?php echo get_post_meta($post->ID, 'project_description', true); ?></p>
        									<a href="javascript:void(0);" class="view-project-btn" t="project<?php echo $post->ID ?>">
        										VIEW PROJECT
        										<span class="view-project-over">VIEW PROJECT</span>
        									</a>
        								</div>
        								<div class="project-<?php if (get_post_meta($post->ID, 'left_or_right', true)=="Left")echo "left";else echo "right"; ?>">
        									<div class="project-image" style="background-image:url(<?php echo wp_get_attachment_url( get_post_meta($post->ID, 'project_image', true) ); ?>);" /></div>
        								</div>
        							</div>
                                </div>
                                <div class="project-detail">
                                	<div class="project-content"><?php the_content(); ?></div>
                                	<div class="project-link"><?php echo get_post_meta($post->ID, 'project_link', true); ?></div>
                                	<div class="project-features"><?php echo get_post_meta($post->ID, 'features', true); ?></div>
                                	<div class="project-thumb"><?php echo wp_get_attachment_url( get_post_meta($post->ID, 'project_thumb', true) ); ?></div>
                                </div>
                            </div>
                        <?php endwhile; wp_reset_query(); 
                    ?>
				</div>
			</div>
