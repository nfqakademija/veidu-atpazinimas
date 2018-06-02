<?php


class ToolbarCest
{
    /**
     * @param AcceptanceTester $I user
     * @throws Exception
     */
    public function checkToolbar(AcceptanceTester $I)
    {
        $I->amOnPage('/attendance');
        $I->seeElement('li[role="menuitem"]');
    }
}
