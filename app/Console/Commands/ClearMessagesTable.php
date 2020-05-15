<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use App\Contracts\MessageServiceInterface;


class ClearMessagesTable extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'clear:messages';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Clear All Incomplete Messages.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct( MessageServiceInterface $messageService )
	{
		parent::__construct();
		$this->messageService = $messageService;
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
			$this->info( $this->messageService );
		// if($this->messageService->deleteIncompleteMessages())
		// else
		// 	$this->info( "Nothing to delete" );
	}
}
