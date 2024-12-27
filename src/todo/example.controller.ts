import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('example')
export class ExampleController {
  
    @Get()
  getData(): Observable<any> {
    return this.fetchData().pipe(
      map(data => {
        // Transform the data using RxJS operators
        return this.processData(data);
      }),
    );
  }

  private fetchData(): Observable<any> {
    // Simulate an asynchronous data retrieval
    return new Observable(observer => {
      setTimeout(() => {
        observer.next('Example data to be fetched@');
        observer.complete();
      }, 1000);
    });
  }

  private processData(data: any): any {
    // Perform some processing on the data
    const dataObject = 'This is the result: ' + data.toUpperCase()
    return dataObject
  }
}