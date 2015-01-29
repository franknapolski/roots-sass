<?php $class = get_body_class(); ?>
<header class="banner navbar navbar-default <?php if ($class[0]=='blog' || $class[0]=='single'): echo "navbar-fixed-top"; else: echo "navbar-static"; endif; ?>" role="banner">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
   <a class="navbar-brand" href="#home"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo-sm.svg" onerror="this.onerror=null; this.src='<?php echo get_template_directory_uri(); ?>/assets/img/logo-sm.png'" alt="<?php bloginfo('name'); ?>" title="<?php bloginfo('name'); ?>"></a>
    <nav class="collapse navbar-collapse" role="navigation">
      <?php
        if (has_nav_menu('primary_navigation')) :
          wp_nav_menu(array('theme_location' => 'primary_navigation', 'menu_class' => 'nav navbar-nav'));
        endif;
      ?>
    </nav>

  </div>
</header>
