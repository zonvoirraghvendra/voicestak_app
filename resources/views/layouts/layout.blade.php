<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>VoiceStack | @yield('title')</title>

        <link
            href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,600,400italic,600italic,700,700italic,800,800italic'
            rel='stylesheet' type='text/css'/>
        <link
            href='https://netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'
            rel='stylesheet' type='text/css'/>
        <!-- Custom css -->
        <link href="/assets/css/style.css" rel="stylesheet">
        {{-- FAVICON --}}
        <link rel="icon" type="image/ico" href="{{url('favicon.ico')}}"/>
        {{-- ////////////////////////// --}}
        <link rel="stylesheet" type="text/css" href="/assets/css_build/all.css">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/mediaelementplayer.css" rel="stylesheet" type="text/css" />
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/design/styles.css" rel="stylesheet" type="text/css" />
         <link href="/assets/css/bootstrap-tagsinput.css" rel="stylesheet" type="text/css" />
        {{-- ////////////////////////// --}}
        @yield('styles')

        
        <!-- Player -->
        <link rel="stylesheet" href="//releases.flowplayer.org/6.0.1/skin/minimalist.css">
        

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

        <!-- Whitelabel Styles -->        
         @if ( null !== Session::get('white_label_options') )
            <style>

                html, body, .vt-steps-container, .container-fluid .vt-campaign-list-container, .container-fluid .vt-inbox-list-container, .container-fluid .vt-sms-list-container, .container-fluid .vt-user-list-container, .container-fluid .vt-page {

                    background: {{ Session::get('white_label_options')['background_color'] }} !important;

                }

                .navbar-inverse {
                    background: {{ Session::get('white_label_options')['top_bar_color'] }} !important;
                }

                .container-fluid .vt-page-header {
                    background-color: {{ Session::get('white_label_options')['header_bar_color'] }} !important;
                }

                nav .navbar-nav>li.active a {
                    background: {{ Session::get('white_label_options')['button_color'] }} !important;
                           }

            </style>
        @endif

    {{-- super--admin --}}
    </head>
    <body class="@yield('body_class')">
        <div class="container-fluid">
            <nav class='navbar navbar-inverse main_menu' id="navBar">
                <div class='navbar-header @if (Auth::guest()) login_page_style @endif'>
                    <button class='navbar-toggle collapsed' data-target='#main_navbar' data-toggle='collapse' type='button'>
                        <span class='sr-only'>Toggle navigation</span>
                        <span class='icon-bar'></span>
                        <span class='icon-bar'></span>
                        <span class='icon-bar'></span>
                    </button>
                    <div>
                        <a href="/widgets">
                            
                            <img class='navbar-brand img-responsive' id="imgLogo" src="
                                                @if ( null !== Session::get('white_label_options') )
                                                
                                                {{ Session::get('white_label_options')['company_logo'] }}
                                                
                                                @else
                                                {{ url('//app.voicestak.com/assets/img/voiceStackLogo.png') }}
                                                @endif
                                                
                                                ">
                        </a>
                        
                    </div>
                </div>
                <div class='collapse navbar-collapse' id='main_navbar'>
                    @if (!Auth::guest())
                        <ul class='nav navbar-nav navbar-right pull-right'>
                            <li class="dropdown">
                                <a aria-expanded='false' class='dropdown-toggle' data-toggle='dropdown' href='#' role='button'>
                                    @if(Auth::user()->image)
                                        <img class='avatar' src='{{ Auth::user()->image }}'>
                                    @else
                                        <div class="hide">
                                            {!! $path = "http://www.gravatar.com/avatar/".md5( strtolower( trim( Auth::user()->email ) ) );
                                                $d = urlencode(url()."/assets/img/default_avatar.jpg");
                                            !!}
                                        </div>
                                        <img src="{!! $path.'?d='.$d !!}" class="avatar"/>
                                    @endif

                                    {{ Auth::user()->name }}
                                    <span class='caret'></span>
                                </a>
                                <ul class="dropdown-menu" role="menu">
                                    
                                        <li @if(Request::is('account*')) class="active" @endif><a href="{{ action('AccountController@getIndex') }}">My Account</a></li>
                                    
                                        @if( Auth::user()->add_integrations == 1)
                                            <li @if(Request::is('settings*')) class="active" @endif><a href="{{ url('/settings') }}">Integrations</a></li>
                                        @endif                                    

                                        <li @if(Request::is('help*')) class="active" @endif><a href="{{ action('HelpController@index') }}">Help</a></li>

                                        @if( Auth::user()->is_super_admin )
                                            <li @if(Request::is('su*')) class="active" @endif><a href="{{ action('AdminController@getIndex') }}">Super Admin</a></li>
                                        @endif

                                        @if( Auth::user()->is_premium || (Auth::user()->add_users == 1))
                                           <li @if(Request::is('users*')) class="active" @endif><a href="{{ url('/users') }}">Users</a></li>
                                        @endif

                                        @if( Auth::user()->is_enterprise == 1)
                                        <!--    <li @if(Request::is('whitelabel*')) class="active" @endif><a href="{{ url('/whitelabel') }}">White Label Settings</a></li> -->
                                        @endif                                    

                                    <li><a href="{{ url('/auth/logout') }}">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul class='nav navbar-nav navbar-right pull-right divider'>
                            @if (!Auth::guest())
                                <li @if(Request::is('messages*')) class="active" @endif>
                                    <a href="{{ url('/messages/') }}">
                                        Inbox
                                        <span class="unread-messages" id="unreadMessages"></span>
                                    </a>
                                </li>
                                <li @if(Request::is('personal-messages*')) class="active" @endif><a href="{{ url('/personal-messages') }}">Messages</a></li>
                                <li @if(Request::is('widgets*')) class="active" @endif><a href="{{ url('/widgets') }}">Widgets</a></li>
                                <li @if(Request::is('reports*')) class="active" @endif><a href="{{ url('/reports') }}">Reports</a></li>
                            @endif
                        </ul>
                    @endif
                </div>
            </nav>

            <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/2.18.1/mediaelement-and-player.min.js"></script>

            <script type="text/javascript" src="/assets/js_build/all.js"></script>
            <script src="//releases.flowplayer.org/6.0.1/flowplayer.min.js"></script>
             <script src="/assets/js/bootstrap-tagsinput.js" type="text/javascript"></script>
            @yield('content')
            <!-- /.container -->
            <!-- Bootstrap core JavaScript
            ================================================== -->
            <!-- Placed at the end of the document so the pages load faster -->

        </div>

        <script src="/assets/js/design/plugins.js" type="text/javascript"></script>

        @yield('scripts')

   </body>
</html>