				<script charset="utf-8" >

alert("inicio");
                    $( document ).ready(function() {
                    //$( document ).on( "load", function() {
						
						var html = "";
						
						$.ajax({
							url: "http://cantabriapadelrank.com/ws/ws_resp_agenda.php",
							type: 'GET',
							dataType: 'json',
							async: false,
							crossDomain: true,
							timeout: 5000,
							data: {
								nom: $input.val().toUpperCase(),
								sexo: sexo
							},
							success: function(data){								
								for (var i = 0; i < data.length; i++){
alert(i);
alert(data[i].mes);
									$("#mes").html(data[i].mes);
alert(data[i].imagen);
									$("#imagen1").attr("src", data[i].imagen);
									$("#imagen2").attr("src", data[i].imagen);
									$("#titular").html(data[i].titular);
									
									
									
									html += "<li><a href='info_jugador.html?id=" + data[i].id_jugador +"' data-ajax='false'>" + 
										  + data[i].rank + "ยบ " + data[i].jugador + "</a></li>";								
								};
	
							}, 
							error: function(){
	
							}
						})
						.then( function ( response ) {
											
							$ul.html( html );
							$ul.listview( "refresh" );
							$ul.trigger( "updatelayout");
	
						});
						
					});					
					
                </script>



				<div class="container">                
					<div class="row">
						<div class="col-md-12">
							<div class="blog-posts">
								<section class="timeline">
									<div class="timeline-body">                                    	
<!-- Timeline -->
										<div class="timeline-date">
											<h3 id="mes" class="heading-primary">November 2013</h3>
										</div>
<!-- Timeline -->
<!-- Article -->
										<article class="timeline-box left post post-medium">
											<div class="row">
												<div class="col-md-12">
													<div class="post-image">
														<div class="owl-carousel" data-plugin-options='{"items":1}'>
															<div>
																<div class="img-thumbnail">
																	<img id="imagen1" class="img-responsive" src="img/blog/blog-image-1.jpg" alt="">
																</div>
															</div>
															<div>
																<div class="img-thumbnail">
																	<img id="imagen2" class="img-responsive" src="img/blog/blog-image-2.jpg" alt="">
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-md-12">
													<div class="post-content">
														<h4 class="heading-primary"><a id="titular" href="blog-post.html">Class aptent taciti sociosqu ad litora.</a></h4>
														<p>Euismod atras vulputate iltricies etri elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-md-12">
													<div class="post-meta">
														<span><i class="fa fa-calendar"></i> January 10, 2015 </span><br>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-md-12">
													<div class="post-meta">
														<span><i class="fa fa-user"></i> By <a href="#">John Doe</a> </span>
														<span><i class="fa fa-tag"></i> <a href="#">Duis</a>, <a href="#">News</a> </span>
														<span><i class="fa fa-comments"></i> <a href="#">12 Comments</a></span>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-md-12">
													<a href="blog-post.html" class="btn btn-xs btn-primary pull-right">Read more...</a>
												</div>
											</div>
										</article>
<!--Load More-->                                        
										<div class="timeline-date">
											<h3 class="heading-primary"><a href="#">Load More...</a></h3>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>