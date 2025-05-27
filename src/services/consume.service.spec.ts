import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConsumeService } from './consume.service';

describe('ConsumeService', () => {
  let service: ConsumeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConsumeService]
    });

    service = TestBed.inject(ConsumeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getList', () => {
    service.getList('/test').subscribe();
    const req = httpMock.expectOne('http://localhost:8080/test');
    expect(req.request.method).toBe('GET');
  });

  it('should call getOne', () => {
    service.getOne('/test', 1).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/test/1');
    expect(req.request.method).toBe('GET');
  });

  it('should call update', () => {
    const body = { name: 'test' };
    service.update('/test', body, 1).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/test/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(body);
  });

  it('should call create', () => {
    const body = { name: 'test' };
    service.create('/test', body).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/test');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
  });

  it('should call delete', () => {
    service.delete('/test', 1).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/test/1');
    expect(req.request.method).toBe('DELETE');
  });

  it('should call calculatePermutations', () => {
    service.calculatePermutations('/permutations', 'ROB', 5).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/permutations?family=ROB&size=5');
    expect(req.request.method).toBe('GET');
  });
});
