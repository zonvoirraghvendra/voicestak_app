<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->

@section('logo')
    /images/logo.jpg
@endsection

<head>
    <title>@yield('meta_title')</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="description" content="@yield('meta_description')">
    <meta name="author" content="@yield('author')"/>

    <link rel="stylesheet" href="{{ url("css/screen.css") }}" type="text/css"/>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" media="screen" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="{{ url("css/styles.css") }}" type="text/css"/>
    <link rel="stylesheet" href="{{ url("css/reveal.css") }}" type="text/css"/>

</head>

<body class="dashboard">
<!--[if lt IE 8]>
<p class='browsehappy'>
    You are using an <strong>outdated</strong> browser. Please <a href="//browsehappy.com/">upgrade your browser</a> to improve your experience.
</p>
<![endif]-->
<div class="container">
    <div id="main-content" role="main">
        <div class="rb--site-container">
            @yield('content')
        </div>
    </div>
</div>
</body>
</html>