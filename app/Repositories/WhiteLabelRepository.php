<?php
namespace App\Repositories;

use App\Models\WhiteLabels;

class WhiteLabelRepository {
    
    
	protected $whitelabel;

	public function __construct(WhiteLabels $whitelabel)
	{
	    $this->whitelabel = $whitelabel;
	}

	public function find($id)
	{
		return $this->whitelabel->find($id);
	}

	public function findBy($att, $column)
	{
		return $this->whitelabel->where($att, $column)->first();
	}
        
    
}

