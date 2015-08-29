<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<meta name="viewport" content="initial-scale=1, maximum-scale=1">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		
		<title><?php bloginfo('name'); ?> // <?php bloginfo('description'); ?></title>

		<link href="//www.google-analytics.com" rel="dns-prefetch">
		<link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">
		<link href="<?php echo get_template_directory_uri(); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">

		<meta name="description" content="We are a creative studio located in Denver, CO that creates interactive and immersive websites, apps and games that tell your brand's story." />
		<meta name="keywords" content="" />
		<meta name="copyright" content="Copyright &copy; Voyage Creative. All Rights Reserved." />
		<meta name="author" content="Voyage (http://www.voyagecreative.com)" />
		<meta name="robots" content="index, follow" />
		
		<!-- Sharing -->
		<meta property="og:type" content="website">
		<meta property="og:site_name" content="Voyage">
		<meta property="og:title" content="<?php bloginfo('name'); ?> // <?php bloginfo('description'); ?>">
		<meta property="og:description" content="We are a creative studio located in Denver, CO that creates interactive and immersive websites, apps and games that tell your brand's story.">
		<meta property="og:url" content="http://voyagecreative.com/">
		<meta property="og:image" content="http://www.voyagecreative.com/img/facebook.jpg">
		<meta name="apple-mobile-web-app-capable" content="yes" />

		<!-- CSS -->
		<link href="<?php echo get_template_directory_uri(); ?>/style.css" rel="stylesheet" type="text/css" />
		
		<!-- INCLUDES -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.11.4/TweenMax.min.js"></script>
		<script src="<?php echo get_template_directory_uri(); ?>/js/plugins-min.js" type="text/javascript"></script>	
		
		<!-- GET THE PARTY STARTED -->
		<script src="<?php echo get_template_directory_uri(); ?>/js/voyage-min.js" type="text/javascript"></script>		
	</head>
	<body <?php body_class(); ?>>
		<div class="body-container">	
				<!-- HEADER -->
				<div id="header">
					<div class="mobile-container">
						<ul>
							<?php 
	                            $args = array(
	                                'include' => '',
	                                'post_type' => 'page',
	                                'post_status' => 'publish',
	                                'order' => 'ASC'
	                            );
	                            
	                            $pages = get_posts($args); 
	                            
	                            foreach ( $pages as $post ) : setup_postdata( $post ); ?>
	                                <li><a class="mobile-link nb" href="javascript:void(0);" path="#<?php echo get_post_meta($post->ID, 'anchor_link', true); ?>"><span><?php the_title(); ?></span></a></li>
	                            <?php endforeach; 
	                        ?>
						</ul>
					</div>
					<!-- BAR -->
					<div class="header-bar">
						<div class="logo-container">
	                        <a class="logo" href="javascript:void(0);" path="#marquee"></a>
	                    </div>
						<div class="nav-bar">
							<?php 
	                            foreach ( $pages as $post ) : setup_postdata( $post ); ?>
	                                <a href="javascript:void(0);" path="#<?php echo get_post_meta($post->ID, 'anchor_link', true); ?>"><?php the_title(); ?></a>
	                            <?php endforeach; 
	                            wp_reset_postdata();
	                        ?>
						</div>
						<div class="social">
							<a class="tw_nav" href="<?php echo get_post_meta(10, 'twitter', true); ?>" target="_blank"></a>
							<a class="fb_nav" href="<?php echo get_post_meta(10, 'instagram', true); ?>" target="_blank"></a>
						</div>
						<div class="mobile-menu">
							<a href="javascript:void(0);">
								<div>
									<span>&nbsp;</span>
									<span>&nbsp;</span>
									<span>&nbsp;</span>
								</div>
							</a>
						</div>
					</div>
				</div>
	            
				<?php include (TEMPLATEPATH . '/projectview.php'); ?>
		            
				<div class="container page">
