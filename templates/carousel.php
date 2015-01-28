<div id="myCarousel" class="carousel slide" data-ride="carousel">
	<div class="carousel-inner">
	<?php 
	   $the_query = new WP_Query(array(
	    'category_name' => 'category_name', 
	    'posts_per_page' => 1,
	    'order' => 'DESC'  
	    )); 
	   while ( $the_query->have_posts() ) : 
	   $the_query->the_post();
	  ?>
	   <div class="item active">
	    <?php the_post_thumbnail('large');?>
	    <div class="carousel-caption">
	     <h4><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
	     <p><?php the_excerpt();?></p>
	    </div>
	   </div><!-- item active -->
	  <?php 
	   endwhile; 
	   wp_reset_postdata();
	  ?>
	  <?php 
	   $the_query = new WP_Query(array(
	    'category_name' => 'category_name', 
	    'posts_per_page' => 3, 
	    'offset' => 1 
	    )); 
	   while ( $the_query->have_posts() ) : 
	   $the_query->the_post();
	  ?>
	   <div class="item">
	    <?php the_post_thumbnail('large');?>
	    <div class="carousel-caption">
	     <h4><a href="<?php the_permalink(); ?>"><?php the_title();?></a></h4>
	     <p><?php the_excerpt();?></p>
	    </div>
	   </div><!-- item -->
	  <?php 
	   endwhile; 
	   wp_reset_postdata();
	  ?>
	 </div><!-- carousel-inner -->

	 <!-- Controls -->
	 <a class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a>
	 <a class="right carousel-control" href="#myCarousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>
	</div><!-- #myCarousel -->