<?php

/*
use Icewind\SMB\ServerFactory;
use Icewind\SMB\BasicAuth;
use Icewind\SMB\KerberosAuth;
use Icewind\SMB\KerberosTicket;

require('vendor/autoload.php');

$serverFactory = new ServerFactory();
$auth = new KerberosAuth();
$auth->setTicket(KerberosTicket::fromEnv());
$server = $serverFactory->createServer('localhost', $auth);

*/



/**
 * SPDX-FileCopyrightText: 2015 Robin Appelman <robin@icewind.nl>
 * SPDX-License-Identifier: MIT
 */
require('vendor/autoload.php');

$host = 'localhost';
$user = 'test';
$workgroup = 'test';
$password = 'test';
$share = 'test';

$auth = new \Icewind\SMB\BasicAuth($user, $workgroup, $password);
$serverFactory = new \Icewind\SMB\ServerFactory();

$server = $serverFactory->createServer($host, $auth);

$share = $server->getShare($share);

$files = $share->dir('/');
foreach ($files as $file) {
	echo $file->getName() . "\n";
}