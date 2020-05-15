var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    //mix.less('app.less');
    mix.scripts(['voicestak_combined.js'], 'public/assets/js/voicestak_combined.js');
    mix.scripts(['RecordRTC.js'], 'public/assets/js/voicestak_record.js');
});
