import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorAlertService } from '../services/error-alert.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorAlertService = inject(ErrorAlertService);

  return next(req).pipe(
    catchError((responseError: HttpErrorResponse) => {
      const errorMessage = getErrorMessage(responseError.status);
      errorAlertService.alertErrorOnScreen(errorMessage);
      return throwError(() => responseError);
    }),
  );

  function getErrorMessage(httpStatusCode: number): string {
    const errors: Record<number, string> = {
      0: 'Ocorreu uma falha de conexão com o servidor',
      400: 'Um ou mais dados da requisição pode estar inválido. Nenhuma ação foi realizada!',
      404: 'O recurso solicitado não foi encontrado ou está indisponível no momento',
      500: 'Ops! Um erro inesperado ocorreu em nossos servidores, não se preocupe, estamos trabalhando em uma solução e voltaremos em breve',
    };

    return (
      errors[httpStatusCode] ??
      'Ocorreu um erro inesperado, se persistir contate o administrador do sistema'
    );
  }
};
