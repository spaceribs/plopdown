import { TabsService } from '@plopdown/browser-ref';
import { Injectable } from '@angular/core';

@Injectable()
export class MockTabsService implements Partial<TabsService> {}
