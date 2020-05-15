@extends('layouts.layout')

@section('title') Help @stop

@section('content')
    <div class="campaigns-page">
        <div class="vt-page-header">
            <div class="vt-page-title">
                <h3>
                    <i class="glyphicon glyphicon-question-sign"></i>
                    HELP
                </h3>
            </div>
        </div>
        <div class="help-page-container">
            <div class="pull-left" id="videoMenu">
                <div class="">
                    <div class="menu-customization">
                        <h3 class="description">
                            <i class="glyphicon glyphicon-play-circle"></i>
                            VIDEO MENU
                        </h3>
                        <ul id="Menu">
                            <a href="#1">
                                <li>SMS Integrations</li>
                            </a>
                            
                            @if( Auth::user()->is_premium )
                            
                            <a href="#2">
                                <li>User Management</li>
                            </a>
                            
                            @endif
                            
                            <a href="#3">
                                <li>Creating Widgets</li>
                            </a>
                            <a href="#4">
                                <li>SMS Messages</li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="help-page-videos">
                <div class="pull-right video-cont" id="1">
                    <h4 class="text-info">SMS Integrations</h4>
                    <iframe allowfullscreen="" frameborder="0" height="400px" src="https://www.youtube.com/embed/8I7ixcdWOIQ" width="100%"></iframe>
                </div>
                
                @if( Auth::user()->is_premium )
                <div class="pull-right video-cont" id="2">
                    <h4 class="text-info">User Management</h4>
                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/TcrT_0EP180" frameborder="0" allowfullscreen></iframe>
                </div>
                @endif
                
                <div class="pull-right video-cont" id="3">
                    <h4 class="text-info">Creating Widgets</h4>
                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/A4f2MEPjMxg" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="pull-right video-cont" id="4">
                    <h4 class="text-info">SMS Messages</h4>
                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/EXQoaR_Mn7g" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
@stop