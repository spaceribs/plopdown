import { Injectable } from '@angular/core';
import { TabsService } from '../src/lib/tabs.service';

@Injectable()
export class MockTabsService implements Partial<TabsService> {}
