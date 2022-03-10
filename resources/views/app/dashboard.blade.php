@extends('layouts.app')

@section('content')
    <section class="p-10 md-p-l5">
        @if(session('success'))
            <p class="fw-600 white">
                {!! session('success') !!}
            </p>
        @endif
        <h2 class="white fs-l2 md-fs-xl1 fw-900 lh-2">
            Welcome to <span class="border-b bc-indigo bw-4">Scribbl</span>
        </h2>
        <div class="br-8 bg-indigo-lightest-10 p-5 md-p-l5 flex flex-wrap md-justify-between md-items-center">
            <div class="w-100pc md-w-100pc">
                <p class="fw-600 indigo-lightest opacity-30">
                    Hey! If you&apos;re seeing this, you&apos;re seeing the first ever version of Scribbl.
                    <br />
                    Thanks for being a super super early adopter (or curious person from the future!).
                </p>
                <section class="p-0 md-p-5">
                    <div class="flex flex-wrap">
                        @foreach($scribbls as $s)
                            <div class="w-100pc md-w-33pc p-3">
                                <a href="/dashboard/view/{{ $s->id }}" class="block no-underline p-5 br-8 bg-indigo-lightest-10 hover-scale-up-1 ease-300">
                                    <p class="fw-600 white fs-m3 mt-3">
                                        {{ $s->title }}
                                    </p>
                                    <div class="indigo fs-s3 italic after-arrow-right my-4">{{ $s->created_at->diffForHumans() }} by {{ Auth::user()->name }} </div>
                                </a>
                            </div>
                        @endforeach
                    </div>
                </section>
            </div>
        </div>
    </section>
@endsection
