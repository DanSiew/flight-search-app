import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavigationService } from './navigation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightSearchModule } from 'src/app/flight-search/flight-search.module';
import { routes } from 'src/app/app-routing.module';

describe('NavigationService', () => {
  let injector: TestBed;
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FlightSearchModule],
      declarations: [],
      providers: [NavigationService],
    });
    injector = getTestBed();
    service = injector.get(NavigationService);

  });

  it('should be defined', done => {
    expect(service).toBeDefined();
    done();
  });

});
