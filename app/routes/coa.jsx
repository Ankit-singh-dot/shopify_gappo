import { redirect } from 'react-router';

export function loader() {
  return redirect('/gapoo-coa-certificate.pdf');
}

export default function CoaRedirect() {
  return null;
}
