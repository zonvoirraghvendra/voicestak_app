<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>VoiceStack</title>
        <script src="/assets/js/jquery.min.js"></script>

        <link
            href='//fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,600,400italic,600italic,700,700italic,800,800italic'
            rel='stylesheet' type='text/css'/>
        <link
            href='//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'
            rel='stylesheet' type='text/css'/>
    {{-- 
        <script src="/javascript/bower_components/angular/angular.js" type="text/javascript"></script>
     --}}   
        <!-- Custom css -->
        <link href="/assets/css/style.css" rel="stylesheet">
        <!-- <script src="/assets/bootstrap/javascripts/bootstrap.min.js"></script> -->

        {{-- FAVICON --}}
        <link rel="icon" type="image/ico" href="{{url('favicon.ico')}}"/>


        {{-- ////////////////////////// --}}
        <link href="/assets/css/design/screen.css" rel="stylesheet" type="text/css" />
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/design/dev.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/design/styles.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/design/rwd.css" rel="stylesheet" type="text/css" />
        <link href="/assets/js/design/c3-chart/c3.min.css" rel="stylesheet" type="text/css" />
        {{-- ////////////////////////// --}}
        @yield('styles')

        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script type="text/javascript" src="/assets/js/moment.js"></script>
        <script type="text/javascript" src="/assets/js/daterangepicker.js"></script>

        <script src="/assets/js/moment.js"></script>
        <script src="/assets/js/jquery.infinitescroll.min.js"></script>

        <script src="/assets/js/ZeroClipboard.min.js"></script>
        <script src="/assets/js/main.js"></script>
        <script src="/assets/js/html5slider.js"></script>
        <script src="/assets/js/copyText.js"></script>
        <!-- Player -->
        <link rel="stylesheet" href="//releases.flowplayer.org/6.0.1/skin/minimalist.css">
        <script src="//releases.flowplayer.org/6.0.1/flowplayer.min.js"></script>

        <script src="/assets/js/design/libs/modernizr-2.7.1.min.js" type="text/javascript"></script>
        <script src="/assets/js/design/c3-chart/d3.v3.js" type="text/javascript" charset="utf-8"></script>
        <script src="/assets/js/design/c3-chart/c3.min.js" type="text/javascript"></script>
        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

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
                        <a href="/widgets"><img class='navbar-brand img-responsive' id="imgLogo" src="{{url('/assets/img/voiceStackLogo.png')}}"></a>
                    </div>
                </div>
                <div class='collapse navbar-collapse' id='main_navbar'>
                    @if (!Auth::guest())
                        <ul class='nav navbar-nav navbar-right pull-right'>
                            <li class="dropdown">
                                <a aria-expanded='false' class='dropdown-toggle' data-toggle='dropdown' href='#' role='button'>
                                  <img class='avatar' src='http://www.murketing.com/journal/wp-content/uploads/2009/04/vimeo.jpg'>
                                  {{ Auth::user()->name }}
                                  <span class='caret'></span>
                                </a>
                                <ul class="dropdown-menu" role="menu">
                                    @if( Auth::user()->assigned_campaigns == ""  )                         
                                        <li @if(Request::is('account*')) class="active" @endif><a href="{{ action('AccountController@getIndex') }}">My Account</a></li>
                                        <li @if(Request::is('settings*')) class="active" @endif><a href="{{ url('/settings') }}">Integrations</a></li>
                                    @endif
                                    <li @if(Request::is('help*')) class="active" @endif><a href="{{ action('HelpController@index') }}">Help</a></li>
                                    @if( Auth::user()->is_super_admin )
                                        <li @if(Request::is('su*')) class="active" @endif><a href="{{ action('AdminController@getIndex') }}">Super Admin</a></li>
                                    @endif
                                    @if( Auth::user()->is_premium )
                                        <li @if(Request::is('users*')) class="active" @endif><a href="{{ url('/users') }}">User</a></li>
                                    @endif
                                    <li><a href="{{ url('/auth/logout') }}">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul class='nav navbar-nav navbar-right pull-right divider'>
                            @if (!Auth::guest())
                                <li @if(Request::is('messages*')) class="active" @endif><a href="{{ url('/messages/') }}">
                                Inbox
                                @if(Auth::user()->unreadmessages())
                                    ({!!Auth::user()->unreadmessages()!!})
                                @endif</a></li>
                                
                                <li @if(Request::is('personal-messages*')) class="active" @endif><a href="{{ url('/personal-messages') }}">Messages</a></li>
                                <li @if(Request::is('widgets*')) class="active" @endif><a href="{{ url('/widgets') }}">Widgets</a></li>
                                <li @if(Request::is('reports*')) class="active" @endif><a href="{{ url('/reports') }}">Reports</a></li>
                            @endif
                        </ul>
                    @endif
                </div>
            </nav>


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
