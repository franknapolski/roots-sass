  <a name="home"></a>
  <?php
  $args = array(
    'sort_order' => 'ASC',
    'sort_column' => 'menu_order',
    'hierarchical' => 1,
    'exclude' => '',
    'child_of' => 0,
    'parent' => -1,
    'exclude_tree' => '',
    'number' => '',
    'offset' => 0,
    'post_type' => 'page',
    'post_status' => 'publish'
  );
  $pages = get_pages($args);
  //start loop
  foreach ($pages as $page_data) {
      $content = apply_filters('the_content', $page_data->post_content);
      $title = $page_data->post_title;
      $slug = $page_data->post_name;
  ?>
  <?php if ($slug == 'home'): ?>
  <section id='<?php echo "$slug" ?>' class="container">
    <div class="intro">
      <div class="relative">
        <div class="intro-text">
         <?php echo "$content" ?>
        </div>
        <div class="logo">
         <img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo.svg" onerror="this.onerror=null; this.src='<?php echo get_template_directory_uri(); ?>/assets/img/logo.png'" alt="<?php bloginfo('name'); ?>" title="<?php bloginfo('name'); ?>">
        </div>
      </div>
    </div>
  </section>
  <div id="home-carousel" class="carousel slide">
    <div class="carousel-inner">
        <div class="item active">
            <div class="fill" style="background-image:url('<?php echo get_template_directory_uri(); ?>/assets/img/bg-2.jpg');"></div>
        </div>
        <div class="item">
            <div class="fill" style="background-image:url('<?php echo get_template_directory_uri(); ?>/assets/img/bg-1.jpg');"></div>
        </div>
        <div class="item">
            <div class="fill" style="background-image:url('<?php echo get_template_directory_uri(); ?>/assets/img/bg-3.jpg');"></div>
        </div>
    </div>
  </div>
  <?php elseif ($slug == 'blog'): ?>
  <?php else: ?>
  <section id='<?php echo "$slug" ?>' class="container">
      <a name='<?php echo "$slug" ?>'></a>
      <h2><?php echo "$title" ?></h2>
      <?php echo "$content" ?>
  </section>
  <?php endif ?>
  <?php } ?>
  <?php get_template_part('templates/page', 'footer'); ?>