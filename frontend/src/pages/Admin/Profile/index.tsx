import { useEffect } from 'react'
import useStore from '../../../../store/store'
import Input from '../../../components/Input'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from '../../../components/Button';
import { reset } from 'numeral';
import Axios from '../../../api';
import Swal from 'sweetalert2';
import isTokenException from '../../../../Utils/isTokenException';
import { useNavigate } from 'react-router-dom';
import logout from '../../../../Utils/logout';

type Props = {}

interface Values {
  fullname: String;
}

interface Password {
  password: String;
  password_confirmation: String;
}

const schema = yup
  .object()
  .shape({
    fullname: yup.string().required("Nama lengkap tidak boleh kosong"),
  })
  .required();

const schemaPassword = yup
  .object()
  .shape({
    password: yup.string()
      .min(8, 'Password minimal 8 karakter.').required("Password tidak boleh kosong"),
    password_confirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'Konfirmasi password tidak sama')
      .required("Konfirmasi password tidak boleh kosong")
  })
  .required();

export default function Profile({ }: Props) {
  const { setIsLoading, user, setUser } = useStore()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Values>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const navigate = useNavigate();

  const { register: registerPassword, reset: resetPassword, handleSubmit: handleSubmitPassword, formState: { errors: errorsPassword } } = useForm<Password>({
    mode: 'onBlur',
    resolver: yupResolver(schemaPassword)
  })

  const onSubmit = (data: Values) => {
    setIsLoading(true);
    Axios.put('profile', data).then((res) => {
      const response = (res.data)
      setUser(response.data);
      Swal.fire({
        title: 'Berhasil memperbarui profile',
        icon: 'success'
      })
    }).catch((err) => {
      const response = err.response;
      window.scrollTo(0, 0);
      console.log(response);
      const errors: string[] = Object.values(response.data.errors);
      if (isTokenException(errors)) return logout(setUser, navigate);
      return [];
    }).finally(() => setIsLoading(false))
  }

  const onSubmitPassword = (data: Password) => {
    setIsLoading(true);
    Axios.put('profile/password', data).then(() => {
      Swal.fire({
        title: 'Berhasil memperbarui password',
        icon: 'success'
      });
      resetPassword();
    }).catch((err) => {
      const response = err.response;
      window.scrollTo(0, 0);
      console.log(response);
      const errors: string[] = Object.values(response.data.errors);
      if (isTokenException(errors)) return logout(setUser, navigate);
      return [];
    }).finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (user) reset(user);
    setIsLoading(false);
  }, [user])
  return (
    <div className='divide-y space-y-4 md:space-y-8'>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label='Username' disabled value={user?.username} />
        <Input label='Nama Lengkap' {...register('fullname')} error={errors.fullname?.message} />
        <div><Button primary>Simpan</Button></div>
      </form>
      <div className='pt-4 md:pt-8 space-y-4'>
        <h1 className='font-medium'>Ubah Password</h1>
        <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label='Password' type='password' {...registerPassword('password')} error={errorsPassword.password?.message} />
          <Input label='Konfirmasi Password' type='password' {...registerPassword('password_confirmation')} error={errorsPassword.password_confirmation?.message} />
          <div><Button primary>Simpan</Button></div>
        </form>
      </div>
    </div>
  )
}