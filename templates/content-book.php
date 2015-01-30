<?php while (have_posts()) : the_post(); ?>
  <article <?php post_class(); ?>>
    <header>
    <h3>Custom Yep!</h3>
      <h1 class="entry-title"><?php the_title(); ?></h1>
      <?php get_template_part('templates/entry-meta'); ?>
    </header>
    <div class="entry-content">
      <?php the_field('author'); ?>
      <?php the_field('publisher'); ?>
      <?php the_field('copyright_date'); ?>
      <?php the_field('cover'); ?>
      <?php the_field('link'); ?>

      <?php the_content(); ?>

    </div>
    <footer>
      <?php wp_link_pages(array('before' => '<nav class="page-nav"><p>' . __('Pages:', 'roots'), 'after' => '</p></nav>')); ?>
    </footer>
    <?php comments_template('/templates/comments.php'); ?>
  </article>
<?php endwhile; ?>
