<?php

/*
 * This file is part of the Symfony CS utility.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Symfony\CS\Tests\Fixer;

use Symfony\CS\Fixer\ExtraEmptyLinesFixer;

class ExtraEmptyLinesFixerTest extends \PHPUnit_Framework_TestCase
{
    public function testFix()
    {
        $fixer = new ExtraEmptyLinesFixer();
        $file = new \SplFileInfo(__FILE__);

        $expected = <<<'EOF'
$a = new Bar();

$a = new FooBaz();
EOF;

        $input = <<<'EOF'
$a = new Bar();


$a = new FooBaz();
EOF;

        $this->assertEquals($expected, $fixer->fix($file, $input));
    }

    public function testFixWithManyEmptyLines()
    {
        $fixer = new ExtraEmptyLinesFixer();
        $file = new \SplFileInfo(__FILE__);

        $expected = <<<'EOF'
$a = new Bar();

$a = new FooBaz();
EOF;

        $input = <<<'EOF'
$a = new Bar();






$a = new FooBaz();
EOF;

        $this->assertEquals($expected, $fixer->fix($file, $input));
    }

    public function testFixWithHeredoc()
    {
        $fixer = new ExtraEmptyLinesFixer();
        $file = new \SplFileInfo(__FILE__);

        $expected = <<<'EOF'
$b = <<<TEXT
Foo TEXT
Bar


FooFoo
TEXT;
EOF;

        $input = <<<'EOF'
$b = <<<TEXT
Foo TEXT
Bar


FooFoo
TEXT;
EOF;

        $this->assertEquals($expected, $fixer->fix($file, $input));
    }

    public function testFixWithNowdoc()
    {
        $fixer = new ExtraEmptyLinesFixer();
        $file = new \SplFileInfo(__FILE__);

        $expected = <<<'EOF'
$b = <<<'TEXT'
Foo TEXT;
Bar1}


FooFoo
TEXT;
EOF;

        $input = <<<'EOF'
$b = <<<'TEXT'
Foo TEXT;
Bar1}


FooFoo
TEXT;
EOF;

        $this->assertEquals($expected, $fixer->fix($file, $input));
    }

    public function testFixWithEncapsulatedNowdoc()
    {
        $fixer = new ExtraEmptyLinesFixer();
        $file = new \SplFileInfo(__FILE__);

        $expected = <<<'EOF'
$b = <<<'TEXT'
Foo TEXT
Bar

<<<'TEMPLATE'
BarFooBar TEMPLATE


TEMPLATE;


FooFoo
TEXT;
EOF;

        $input = <<<'EOF'
$b = <<<'TEXT'
Foo TEXT
Bar

<<<'TEMPLATE'
BarFooBar TEMPLATE


TEMPLATE;


FooFoo
TEXT;
EOF;

        $this->assertEquals($expected, $fixer->fix($file, $input));
    }

    public function testFixWithMultilineString()
    {
        $fixer = new ExtraEmptyLinesFixer();
        $file = new \SplFileInfo(__FILE__);

        $expected = <<<'EOF'
$a = 'Foo


Bar';
EOF;

        $input = <<<'EOF'
$a = 'Foo


Bar';
EOF;

        $this->assertEquals($expected, $fixer->fix($file, $input));
    }

    public function testFixWithTrickyMultilineStrings()
    {
        $fixer = new ExtraEmptyLinesFixer();
        $file = new \SplFileInfo(__FILE__);

        $expected = <<<'EOF'
$a = 'Foo';

$b = 'Bar


Here\'s an escaped quote '

.

'


FooFoo';
EOF;

        $input = <<<'EOF'
$a = 'Foo';


$b = 'Bar


Here\'s an escaped quote '


.


'


FooFoo';
EOF;

        $this->assertEquals($expected, $fixer->fix($file, $input));
    }
}
